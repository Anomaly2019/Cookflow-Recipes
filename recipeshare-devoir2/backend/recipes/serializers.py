from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'ingredients', 'steps', 'price', 'is_public', 'user', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
