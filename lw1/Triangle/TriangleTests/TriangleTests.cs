using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.IO;

using triangle = Triangle.Triangle;

namespace TriangleTests
{
    [TestClass]
    public class TriangleTests
    {
        [TestMethod]
        public void Test()
        {
            string testsFile = "../../../test.txt";
            string outputFile = "../../../output.txt";

            if (!File.Exists(testsFile))
            {
                Console.WriteLine("Tests not found!");
                return;
            }

            FileStream fileIn = new FileStream(testsFile, FileMode.Open);
            FileStream fileOut = new FileStream(outputFile, FileMode.Create);
            StreamReader reader = new StreamReader(fileIn);
            StreamWriter writer = new StreamWriter(fileOut);
                
            int i = 1;
            while (!reader.EndOfStream)
            {
                string str = reader.ReadLine();
                string[] args = str.Split();

                triangle.Main(args);
                str = reader.ReadLine();

                if (str == triangle.result)
                {
                    writer.WriteLine("{0} success", i);
                }
                else
                {
                    writer.WriteLine("{0} error", i);
                }
                i++;
            }

            reader.Close();
            writer.Close();
        }
    }
}
