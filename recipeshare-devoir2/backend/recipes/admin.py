from django.contrib import admin
from .models import Recipe, Payment


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ("title", "price", "is_public", "created_at")
    search_fields = ("title",)


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("customer_name", "amount", "country", "created_at")
    list_filter = ("country", "created_at")
    search_fields = ("customer_name",)
