using System;

namespace Shapes
{
    public class Triangle
    {
        private (double, double) _firstVertex;
        private (double, double) _secondVertex ;
        private (double, double) _thirdVertex;
        private string _color;

        public Triangle((double, double) firstVertex, (double, double) secondVertex, (double, double) thirdVertex, string color)
        {
            _firstVertex = firstVertex;
            _secondVertex = secondVertex;
            _thirdVertex = thirdVertex;
            _color = color;
        }

        public double GetArea()
        {
            try
            {
                double a = Math.Sqrt(Math.Pow((_secondVertex.Item1 - _firstVertex.Item1), 2) + Math.Pow((_secondVertex.Item2 - _firstVertex.Item2), 2));
                double b = Math.Sqrt(Math.Pow((_thirdVertex.Item1 - _secondVertex.Item1), 2) + Math.Pow((_thirdVertex.Item2 - _secondVertex.Item2), 2));
                double c = Math.Sqrt(Math.Pow((_firstVertex.Item1 - _thirdVertex.Item1), 2) + Math.Pow((_firstVertex.Item2 - _thirdVertex.Item2), 2));

                if (double.IsInfinity(a) || double.IsInfinity(b) || double.IsInfinity(c))
                {
                    throw new OverflowException();
                }

                double p = (a + b + c) / 2;
                double S = Math.Round(Math.Sqrt(p * (p - a) * (p - b) * (p - c)), 2);

                if (double.IsInfinity(S))
                {
                    throw new OverflowException();
                }

                return S;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return 0;
            }
        }

        public double GetPerimeter()
        {
            try
            {
                double a = Math.Sqrt(Math.Pow((_secondVertex.Item1 - _firstVertex.Item1), 2) + Math.Pow((_secondVertex.Item2 - _firstVertex.Item2), 2));
                double b = Math.Sqrt(Math.Pow((_thirdVertex.Item1 - _secondVertex.Item1), 2) + Math.Pow((_thirdVertex.Item2 - _secondVertex.Item2), 2));
                double c = Math.Sqrt(Math.Pow((_firstVertex.Item1 - _thirdVertex.Item1), 2) + Math.Pow((_firstVertex.Item2 - _thirdVertex.Item2), 2));

                if (double.IsInfinity(a) || double.IsInfinity(b) || double.IsInfinity(c))
                {
                    throw new OverflowException();
                }

                double P = Math.Round(a + b + c, 2);

                if (double.IsInfinity(P))
                {
                    throw new OverflowException();
                }

                return P;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return 0;
            }
        }

        public string GetColor()
        {
            return _color;
        }

        public string ToStr()
        {
            return $"Vertex 1:  ({_firstVertex.Item1}, {_firstVertex.Item2})  " +
                $"Vertex 2: ({_secondVertex.Item1}, {_secondVertex.Item2})  " +
                $"Vertex 3: ({_thirdVertex.Item1}, {_thirdVertex.Item2})  " +
                $"Area: {GetArea()}  " +
                $"Perimeter: {GetPerimeter()}";
        }
    }
}
