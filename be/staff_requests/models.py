# staff_requests/models.py
from django.db import models
from django.conf import settings

class Request(models.Model):
    REQUEST_TYPES = [
        ('leave',      'Leave'),
        ('equipment',  'Equipment'),
        ('supply',     'Supply'),
        ('repair',     'Repair'),
        ('training',   'Training'),
    ]
    STATUS_CHOICES = [
        ('pending',  'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    requester    = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    request_type = models.CharField(max_length=20, choices=REQUEST_TYPES)
    status       = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    # Fields for LeaveRequest
    start_date   = models.DateField(null=True, blank=True)
    end_date     = models.DateField(null=True, blank=True)
    reason       = models.TextField(blank=True)

    # Fields for EquipmentRequest
    equipment_name = models.CharField(max_length=255, blank=True)
    quantity       = models.PositiveIntegerField(null=True, blank=True)
    justification  = models.TextField(blank=True)

    # Fields for SupplyRequest
    supply_item     = models.CharField(max_length=255, blank=True)
    amount          = models.PositiveIntegerField(null=True, blank=True)
    urgency_level   = models.CharField(max_length=50, blank=True)

    # Fields for RepairRequest
    equipment_id        = models.CharField(max_length=100, blank=True)
    problem_description = models.TextField(blank=True)
    reported_date       = models.DateField(null=True, blank=True)

    # Fields for TrainingRequest
    course_name    = models.CharField(max_length=255, blank=True)
    provider       = models.CharField(max_length=255, blank=True)
    training_date  = models.DateField(null=True, blank=True)
    cost_estimate  = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"{self.get_request_type_display()} by {self.requester} ({self.status})"
