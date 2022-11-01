using System.Collections.Generic;

namespace Shapes
{
    public struct ResultWithShape
    {
        public bool message;
        public Triangle triangle;
    }

    public class Canvas//переименовать
    {
        private List<Triangle> _triangles = new List<Triangle>(); //метод для получения треугольников
        private string _color = "ffffff";

        public bool AddTriangle(Triangle triangle)
        {
            int length = _triangles.Count;
            if (!_triangles.Contains(triangle))
            {
                _triangles.Add(triangle);
            }
            return (length + 1) == _triangles.Count;
        }

        public bool RemoveTriangle(Triangle triangle)
        {
            int length = _triangles.Count;
            if (_triangles.Contains(triangle))
            {
                _triangles.Remove(triangle);
            }
            return (length - 1) == _triangles.Count;
        }

        public int GetAmount()
        {
            return _triangles.Count;
        }

        public Triangle GetTriangleWithMaxArea()
        {
            if (GetAmount() == 0)
            {
                return null;
            }

            Triangle triangleWithMaxArea = _triangles[0];
            foreach (Triangle triangle in _triangles)
            {
                if (triangle.GetArea() > triangleWithMaxArea.GetArea())
                {
                    triangleWithMaxArea = triangle;
                }
            }

            return triangleWithMaxArea;
        }

        public Triangle GetTriangleWithMinPerimeter()
        {
            if (GetAmount() == 0)
            {
                return null;
            }

            Triangle triangleWithMinPerimeter = _triangles[0];
            foreach (Triangle triangle in _triangles)
            {
                if (triangle.GetPerimeter() < triangleWithMinPerimeter.GetPerimeter())
                {
                    triangleWithMinPerimeter = triangle;
                }
            }

            return triangleWithMinPerimeter;
        }

        public string GetBackground()
        {
            return _color;
        }

        public bool SetBackground(string color)
        {
            foreach (Triangle triangle in _triangles)
            {
                if (triangle.GetColor() == color)
                {
                    return false;
                }
            }

            _color = color;
            return true;
        }

        public List<Triangle> GetTriangles()
        {
            return _triangles;
        }
    }
}
