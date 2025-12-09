from django.contrib import admin
from .models import Recipe

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'is_public', 'price', 'created_at')
    list_filter = ('is_public', 'created_at')
    search_fields = ('title', 'ingredients', 'steps', 'user__username')
