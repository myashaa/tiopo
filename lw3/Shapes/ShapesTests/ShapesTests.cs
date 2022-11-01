using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Shapes;
using System.Collections.Generic;

namespace ShapesTests
{
    [TestClass]
    public class ShapesTests
    {
        public Mock<Triangle> createTriangleMock((double, double) firstVertex, (double, double) secondVertex, (double, double) thirdVertex, string color)
        {
            Mock<Triangle> triangleMock = new Mock<Triangle>(firstVertex, secondVertex, thirdVertex, color);
            return triangleMock;
        }

        [TestMethod]
        public void Add_Triangle_To_Empty_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock = createTriangleMock((400, 200), (200, 600), (600, 600), "000000");

            //act
            bool result = canvas.AddTriangle(triangleMock.Object);

            //assert
            Assert.IsTrue(result);
            Assert.AreEqual(canvas.GetAmount(), 1);
            Assert.AreEqual(canvas.GetTriangles()[0].ToStr(), triangleMock.Object.ToStr());
        }

        [TestMethod]
        public void Add_Triangles_To_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock1 = createTriangleMock((400, 200), (200, 600), (600, 600), "000000");
            Mock<Triangle> triangleMock2 = createTriangleMock((20, 40), (60, 20), (60, 60), "000000");

            //act
            bool result1 = canvas.AddTriangle(triangleMock1.Object);
            bool result2 = canvas.AddTriangle(triangleMock2.Object);

            //assert
            Assert.IsTrue(result1);
            Assert.IsTrue(result2);
            Assert.AreEqual(canvas.GetAmount(), 2);
            Assert.AreEqual(canvas.GetTriangles()[0].ToStr(), triangleMock1.Object.ToStr());
            Assert.AreEqual(canvas.GetTriangles()[1].ToStr(), triangleMock2.Object.ToStr());
        }

        [TestMethod]
        public void Add_Existing_Triangle_To_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock = createTriangleMock((400, 200), (200, 600), (600, 600), "000000");

            //act
            bool result1 = canvas.AddTriangle(triangleMock.Object);
            bool result2 = canvas.AddTriangle(triangleMock.Object);

            //assert
            Assert.IsTrue(result1);
            Assert.IsFalse(result2);
            Assert.AreEqual(canvas.GetAmount(), 1);
            Assert.AreEqual(canvas.GetTriangles()[0].ToStr(), triangleMock.Object.ToStr());
        }

        [TestMethod]
        public void Remove_Triangle_From_Empty_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock = createTriangleMock((400, 200), (200, 600), (600, 600), "000000");

            //act
            bool result = canvas.RemoveTriangle(triangleMock.Object);

            //assert
            Assert.IsFalse(result);
            Assert.AreEqual(canvas.GetAmount(), 0);
        }

        [TestMethod]
        public void Remove_Triangle_From_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock = createTriangleMock((400, 200), (200, 600), (600, 600), "000000");

            //act
            canvas.AddTriangle(triangleMock.Object);
            bool result = canvas.RemoveTriangle(triangleMock.Object);

            //assert
            Assert.IsTrue(result);
            Assert.AreEqual(canvas.GetAmount(), 0);
        }

        //удаление трекголтника из нескольких
        [TestMethod]
        public void Remove_Triangle_From_Canvas_Of_Several_Elements()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock1 = createTriangleMock((400, 200), (200, 600), (600, 600), "000000");
            Mock<Triangle> triangleMock2 = createTriangleMock((20, 40), (60, 20), (60, 60), "000000");

            //act
            canvas.AddTriangle(triangleMock1.Object);
            canvas.AddTriangle(triangleMock2.Object);
            bool result = canvas.RemoveTriangle(triangleMock1.Object);

            //assert
            Assert.IsTrue(result);
            Assert.AreEqual(canvas.GetAmount(), 1);
            Assert.AreEqual(canvas.GetTriangles()[0].ToStr(), triangleMock2.Object.ToStr());
        }

        [TestMethod]
        public void Remove_Nonexisting_Triangle_From_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock1 = createTriangleMock((400, 200), (200, 600), (600, 600), "000000");
            Mock<Triangle> triangleMock2 = createTriangleMock((20, 40), (60, 20), (60, 60), "000000");

            //act
            canvas.AddTriangle(triangleMock1.Object);
            bool result = canvas.RemoveTriangle(triangleMock2.Object);

            //assert
            Assert.IsFalse(result);
            Assert.AreEqual(canvas.GetAmount(), 1);
            Assert.AreEqual(canvas.GetTriangles()[0].ToStr(), triangleMock1.Object.ToStr());
        }

        [TestMethod]
        public void Get_Amount_From_Empty_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();

            //act
            int amount = canvas.GetAmount();
            int result = 0;

            //assert
            Assert.AreEqual(amount, result);
        }

        [TestMethod]
        public void Get_Amount_From_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock = createTriangleMock((400, 200), (200, 600), (600, 600), "000000");

            //act
            canvas.AddTriangle(triangleMock.Object);
            int amount = canvas.GetAmount();
            int result = 1;

            //assert
            Assert.AreEqual(amount, result);
        }

        [TestMethod]
        public void Get_Triangle_With_Max_Area_From_Empty_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();

            //act
            Triangle resultTriangle = canvas.GetTriangleWithMaxArea();

            //assert
            Assert.IsNull(resultTriangle);
        }

        [TestMethod]
        public void Get_Triangle_With_Max_Area_From_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock1 = createTriangleMock((400, 200), (200, 600), (600, 600), "000000"); //Area: 80000
            Mock<Triangle> triangleMock2 = createTriangleMock((20, 40), (60, 20), (60, 60), "000000"); //Area: 800

            //act
            canvas.AddTriangle(triangleMock1.Object);
            canvas.AddTriangle(triangleMock2.Object);
            Triangle resultTriangle = canvas.GetTriangleWithMaxArea();

            //assert
            Assert.IsNotNull(resultTriangle);
            Assert.AreEqual(resultTriangle, triangleMock1.Object);
        }

        //если одинаковая  площадь, то возвращается первый
        [TestMethod]
        public void Get_Triangle_With_Max_Area_When_Two_Triangles_Have_Same_Area()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock1 = createTriangleMock((400, 200), (200, 600), (600, 600), "000000"); //Area: 80000
            Mock<Triangle> triangleMock2 = createTriangleMock((200, 400), (600, 200), (600, 600), "000000"); //Area: 80000

            //act
            canvas.AddTriangle(triangleMock1.Object);
            canvas.AddTriangle(triangleMock2.Object);
            Triangle resultTriangle = canvas.GetTriangleWithMaxArea();

            //assert
            Assert.IsNotNull(resultTriangle);
            Assert.AreEqual(resultTriangle, triangleMock1.Object);
        }

        [TestMethod]
        public void Get_Triangle_With_Min_Perimeter_From_Empty_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();

            //act
            Triangle resultTriangle = canvas.GetTriangleWithMinPerimeter();

            //assert
            Assert.IsNull(resultTriangle);
        }

        [TestMethod]
        public void Get_Triangle_With_Min_Perimeter_From_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock1 = createTriangleMock((400, 200), (200, 600), (600, 600), "000000"); //Perimeter: 1294,43
            Mock<Triangle> triangleMock2 = createTriangleMock((20, 40), (60, 20), (60, 60), "000000"); //Perimeter: 129,44

            //act
            canvas.AddTriangle(triangleMock1.Object);
            canvas.AddTriangle(triangleMock2.Object);
            Triangle resultTriangle = canvas.GetTriangleWithMinPerimeter();

            //assert
            Assert.IsNotNull(resultTriangle);
            Assert.AreEqual(resultTriangle, triangleMock2.Object);
        }

        //если одинаковый периметр, то возвращается первый
        [TestMethod]
        public void Get_Triangle_With_Min_Perimeter_When_Two_Triangles_Have_Same_Perimeter()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock1 = createTriangleMock((400, 200), (200, 600), (600, 600), "000000"); //Perimeter: 1294,43
            Mock<Triangle> triangleMock2 = createTriangleMock((200, 400), (600, 200), (600, 600), "000000"); //Perimeter: 1294,43

            //act
            canvas.AddTriangle(triangleMock1.Object);
            canvas.AddTriangle(triangleMock2.Object);
            Triangle resultTriangle = canvas.GetTriangleWithMinPerimeter();

            //assert
            Assert.IsNotNull(resultTriangle);
            Assert.AreEqual(resultTriangle, triangleMock1.Object);
        }

        [TestMethod]
        public void Get_Background_From_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();

            //act
            string canvasBackground = canvas.GetBackground();
            string result = "ffffff";

            //assert
            Assert.AreEqual(canvasBackground, result);
        }

        [TestMethod]
        public void Set_Background_To_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();

            //act
            bool canvasBackground = canvas.SetBackground("000000");
            string result = "000000";

            //assert
            Assert.IsTrue(canvasBackground);
            Assert.AreEqual(canvas.GetBackground(), result);
        }

        [TestMethod]
        public void Set_Existing_Background_To_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock = createTriangleMock((400, 200), (200, 600), (600, 600), "000000");

            //act
            canvas.AddTriangle(triangleMock.Object);
            bool canvasBackground = canvas.SetBackground("000000");
            string result = "ffffff";

            //assert
            Assert.IsFalse(canvasBackground);
            Assert.AreEqual(canvas.GetBackground(), result);
        }

        [TestMethod]
        public void Get_Triangles_From_Canvas()
        {
            //arrange
            Canvas canvas = new Canvas();
            Mock<Triangle> triangleMock1 = createTriangleMock((400, 200), (200, 600), (600, 600), "000000");
            Mock<Triangle> triangleMock2 = createTriangleMock((20, 40), (60, 20), (60, 60), "000000");
            Triangle triangle1 = new Triangle((400, 200), (200, 600), (600, 600), "000000");
            Triangle triangle2 = new Triangle((20, 40), (60, 20), (60, 60), "000000");

            //act
            canvas.AddTriangle(triangleMock1.Object);
            canvas.AddTriangle(triangleMock2.Object);
            List<Triangle> canvasTriangles = canvas.GetTriangles();
            List<Triangle> result = new List<Triangle>() { triangle1, triangle2 };

            //assert
            Assert.AreEqual(canvasTriangles[0].ToStr(), result[0].ToStr());
            Assert.AreEqual(canvasTriangles[1].ToStr(), result[1].ToStr());
        }
    }
}
