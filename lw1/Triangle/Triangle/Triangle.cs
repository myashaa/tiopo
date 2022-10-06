using System;

namespace Triangle
{
    public class Triangle
    {
        public static string result;
        public static void Main(string[] args)
        {
            double a, b, c;
            try
            {
                if (args.Length != 3)
                {
                    throw new Exception();
                }

                a = Convert.ToDouble(args[0]);
                b = Convert.ToDouble(args[1]);
                c = Convert.ToDouble(args[2]);
                if (double.IsInfinity(a) || double.IsInfinity(b) || double.IsInfinity(c))
                {
                    throw new OverflowException();
                }

                if ((a > c - b) && (a > b - c) && (c > a - b))
                {
                    if ((a == b) && (a == c))
                    {
                        result = "равносторонний";
                    }
                    else if ((a == b) || (a == c) || (b == c))
                    {
                        result = "равнобедренный";
                    }
                    else
                    {
                        result = "обычный";
                    }
                }
                else
                {
                    result = "не треугольник";
                }
            }
            catch
            {
                result = "неизвестная ошибка";
            }

            Console.WriteLine(result);
        }
    }
}
