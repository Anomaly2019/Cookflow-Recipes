from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Read for everyone, write only for owner.
    """

    def has_object_permission(self, request, view, obj):
        # SAFE methods = GET, HEAD, OPTIONS
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions only for owner
        return obj.user == request.user
