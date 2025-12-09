from django.db import models
from django.contrib.auth.models import User

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    ingredients = models.TextField(blank=True, null=True)
    steps = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_public = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'recipes'
