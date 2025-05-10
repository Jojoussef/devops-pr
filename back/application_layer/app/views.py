from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ToDoItem
from .serializers import TodoItemSerializer

class TodoItemViewSet(viewsets.ModelViewSet):
    """
    list, create, retrieve, update, destroy all provided by DRF
    """
    queryset = ToDoItem.objects.all().order_by('-created_at')
    serializer_class = TodoItemSerializer

    @action(detail=True, methods=['post'])
    def mark_complete(self, request, pk=None):
        """
        POST /api/todos/{pk}/mark_complete/
        """
        todo = self.get_object()
        todo.completed = True
        todo.save()
        return Response(self.get_serializer(todo).data)
