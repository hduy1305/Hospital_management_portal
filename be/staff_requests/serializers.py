# # staff_requests/serializers.py
# from rest_framework import serializers
# from .models import Request

# class RequestSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Request
#         # Liệt kê hết, chúng ta sẽ lọc sau trong __init__
#         fields = [
#             'id','request_type','status','created_at','updated_at','requester',
#             'start_date','end_date','reason',
#             'equipment_name','quantity','justification',
#             'supply_item','amount','urgency_level',
#             'equipment_id','problem_description','reported_date',
#             'course_name','provider','training_date','cost_estimate',
#         ]
#         read_only_fields = ['requester','status','created_at','updated_at']

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)

#         # Xác định request_type từ instance (GET/PUT) hoặc initial_data (POST)
#         rt = None
#         if hasattr(self, 'instance') and self.instance is not None:
#             rt = self.instance.request_type
#         elif isinstance(self.initial_data, dict):
#             rt = self.initial_data.get('request_type')

#         # Các field chung luôn giữ lại
#         allowed = {
#             'id','request_type','status','created_at',
#             'updated_at','requester'
#         }

#         # Thêm các field đặc thù theo loại
#         if rt == 'leave':
#             allowed |= {'start_date','end_date','reason'}
#         elif rt == 'equipment':
#             allowed |= {'equipment_name','quantity','justification'}
#         elif rt == 'supply':
#             allowed |= {'supply_item','amount','urgency_level'}
#         elif rt == 'repair':
#             allowed |= {'equipment_id','problem_description','reported_date'}
#         elif rt == 'training':
#             allowed |= {'course_name','provider','training_date','cost_estimate'}
#         else:
#             # Nếu chưa biết loại (POST thiếu request_type), chỉ giữ request_type để validate
#             allowed |= {'request_type'}

#         # Loại bỏ các field không nằm trong allowed
#         for field_name in list(self.fields):
#             if field_name not in allowed:
#                 self.fields.pop(field_name)

#     def validate(self, attrs):
#         # Chỉ validate khi tạo mới hoặc update có request_type
#         t = attrs.get('request_type', getattr(self.instance, 'request_type', None))
#         errors = {}

#         if t == 'leave':
#             for f in ('start_date','end_date','reason'):
#                 if not attrs.get(f) and not getattr(self.instance, f, None):
#                     errors[f] = 'This field is required for leave requests.'
#         elif t == 'equipment':
#             for f in ('equipment_name','quantity','justification'):
#                 if not attrs.get(f) and not getattr(self.instance, f, None):
#                     errors[f] = f'{f} is required for equipment requests.'
#         elif t == 'supply':
#             for f in ('supply_item','amount','urgency_level'):
#                 if not attrs.get(f) and not getattr(self.instance, f, None):
#                     errors[f] = f'{f} is required for supply requests.'
#         elif t == 'repair':
#             for f in ('equipment_id','problem_description','reported_date'):
#                 if not attrs.get(f) and not getattr(self.instance, f, None):
#                     errors[f] = f'{f} is required for repair requests.'
#         elif t == 'training':
#             for f in ('course_name','provider','training_date','cost_estimate'):
#                 if not attrs.get(f) and not getattr(self.instance, f, None):
#                     errors[f] = f'{f} is required for training requests.'

#         if errors:
#             raise serializers.ValidationError(errors)

#         return attrs

#     def create(self, validated_data):
#         # Gán requester tự động từ context
#         user = self.context['request'].user
#         validated_data['requester'] = user
#         return super().create(validated_data)


# staff_requests/serializers.py
from rest_framework import serializers
from .models import Request

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        # Khai báo tất cả các field, sẽ prune về sau
        fields = [
            'id', 'requester', 'request_type', 'status', 'created_at', 'updated_at',
            # Thông tin đơn nghỉ phép
            'start_date', 'end_date', 'reason',
            # Thông tin đơn thiết bị
            'equipment_name', 'quantity', 'justification',
            # Thông tin đơn vật tư
            'supply_item', 'amount', 'urgency_level',
            # Thông tin đơn sửa chữa
            'equipment_id', 'problem_description', 'reported_date',
            # Thông tin đơn đào tạo
            'course_name', 'provider', 'training_date', 'cost_estimate',
        ]
        read_only_fields = ['id', 'requester', 'status', 'created_at', 'updated_at']

    def validate(self, attrs):
        """
        Validate các trường bắt buộc tuỳ theo request_type.
        """
        t = attrs.get('request_type', getattr(self.instance, 'request_type', None))
        errors = {}

        if t == 'leave':
            for f in ('start_date','end_date','reason'):
                if not attrs.get(f) and not getattr(self.instance, f, None):
                    errors[f] = 'Trường này bắt buộc với đơn nghỉ phép.'
        elif t == 'equipment':
            for f in ('equipment_name','quantity','justification'):
                if not attrs.get(f) and not getattr(self.instance, f, None):
                    errors[f] = f'{f} là bắt buộc với đơn thiết bị.'
        elif t == 'supply':
            for f in ('supply_item','amount','urgency_level'):
                if not attrs.get(f) and not getattr(self.instance, f, None):
                    errors[f] = f'{f} là bắt buộc với đơn vật tư.'
        elif t == 'repair':
            for f in ('equipment_id','problem_description','reported_date'):
                if not attrs.get(f) and not getattr(self.instance, f, None):
                    errors[f] = f'{f} là bắt buộc với đơn sửa chữa.'
        elif t == 'training':
            for f in ('course_name','provider','training_date','cost_estimate'):
                if not attrs.get(f) and not getattr(self.instance, f, None):
                    errors[f] = f'{f} là bắt buộc với đơn đào tạo.'

        if errors:
            raise serializers.ValidationError(errors)
        return attrs

    def create(self, validated_data):
        """
        Gán requester từ user hiện tại.
        """
        validated_data['requester'] = self.context['request'].user
        return super().create(validated_data)

    def to_representation(self, instance):
        """
        Sau khi đã serialize đầy đủ, prune (loại bỏ) các field không cần thiết
        tuỳ vào instance.request_type.
        """
        data = super().to_representation(instance)
        rt = instance.request_type

        # Field chung luôn giữ lại
        allowed = {
            'id', 'requester', 'request_type', 'status',
            'created_at', 'updated_at'
        }
        # Thêm field đặc thù theo loại đơn
        if rt == 'leave':
            allowed |= {'start_date','end_date','reason'}
        elif rt == 'equipment':
            allowed |= {'equipment_name','quantity','justification'}
        elif rt == 'supply':
            allowed |= {'supply_item','amount','urgency_level'}
        elif rt == 'repair':
            allowed |= {'equipment_id','problem_description','reported_date'}
        elif rt == 'training':
            allowed |= {'course_name','provider','training_date','cost_estimate'}

        # Trả về dict chỉ chứa những key nằm trong allowed
        return {k: v for k, v in data.items() if k in allowed}
