using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Links
{
    class Program
    {
        static void PrintLinksToFile( StreamWriter stream, List<string> links )
        {
            foreach ( var link in links )
            {
                stream.WriteLine( link );
            }

            stream.WriteLine( "количество ссылок: " + links.Count() );
            stream.WriteLine( "дата проверки: " + DateTime.Now );
        }


        static void Main( string[] args )
        {
            try
            {
                if ( args.Length != 1 )
                {
                    throw new Exception( "неверное количество входных аргументов" );
                }

                string link = args[ 0 ];

                using ( LinkChecker linkChecker = new LinkChecker( link ) )
                {
                    linkChecker.CheckAllLinks();

                    string validFile = "../../../valid.txt";
                    string invalidFile = "../../../invalid.txt";
                    FileStream validFileStream = new FileStream( validFile, FileMode.Create );
                    FileStream invalidFileStream = new FileStream( invalidFile, FileMode.Create );
                    StreamWriter validStreamWriter = new StreamWriter( validFileStream );
                    StreamWriter invalidStreamWriter = new StreamWriter( invalidFileStream );

                    PrintLinksToFile( validStreamWriter, linkChecker.GetValidLinks() );
                    PrintLinksToFile( invalidStreamWriter, linkChecker.GetInvalidLinks() );

                    validStreamWriter.Close();
                    invalidStreamWriter.Close();
                }
            }
            catch ( Exception e )
            {
                Console.WriteLine( e.Message );
            }
        }
    }
}
