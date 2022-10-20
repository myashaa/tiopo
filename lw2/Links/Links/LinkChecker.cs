using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace Links
{
    public class LinkChecker : IDisposable
    {
        private readonly List<string> _validLinks = new List<string>();
        private readonly List<string> _invalidLinks = new List<string>();
        private readonly List<string> _allLinks = new List<string>();
        private static string _inputLink;

        private readonly HttpClient _client = new HttpClient();

        public LinkChecker( string link )
        {
            _inputLink = link;
        }

        public void Dispose()
        {
            _client.Dispose();
        }

        public void CheckAllLinks()
        {
            _allLinks.Add( _inputLink );
            GetLinks( _inputLink );

            foreach ( var address in _allLinks )
            {
                string url;
                if ( !address.StartsWith( "http://" ) && !address.StartsWith( "https://" ) )
                {
                    url = _inputLink + address;
                }
                else
                {
                    url = address;
                }

                var clientResponse = _client.GetAsync( url ).Result;
                int code = ( int )clientResponse.StatusCode;
                string response = $"{url} {code} {clientResponse.StatusCode}";

                if ( IsValidLink( clientResponse ) )
                {
                    _validLinks.Add( response );
                }
                else
                {
                    _invalidLinks.Add( response );
                }
            }
        }

        private void GetLinks( string link )
        {
            try
            {
                HtmlWeb htmlWeb = new HtmlWeb();
                HtmlDocument htmlDocument = htmlWeb.Load( link );
                HtmlNode[] htmlNodes = htmlDocument.DocumentNode.SelectNodes( "//a" ).ToArray();

                foreach ( HtmlNode node in htmlNodes )
                {
                    string url = node.GetAttributeValue( "href", null );

                    if ( ( ( url != "" ) && ( url != "/" ) && ( url != "#" ) ) && Uri.IsWellFormedUriString( url, UriKind.RelativeOrAbsolute ) )
                    {
                        if ( url.Contains( _inputLink ) || ( !url.StartsWith( "http://" ) && !url.StartsWith( "https://" ) && !url.StartsWith( "//" ) && !url.Contains( ':' ) ) )
                        {
                            if ( !_allLinks.Contains( url ) )
                            {
                                _allLinks.Add(url);

                                if (url.Contains(_inputLink))
                                {
                                    GetLinks(url);
                                }
                                else
                                {
                                    GetLinks(_inputLink + url);
                                }
                            }
                        }
                    }
                }
            }
            catch ( Exception e )
            {
                Console.WriteLine( e.Message );
            }
        }

        private bool IsValidLink( HttpResponseMessage clientResponse )
        {
            int statusCode = ( int )clientResponse.StatusCode;

            if ( statusCode < 400 && statusCode >= 200 )
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<string> GetValidLinks()
        {
            return _validLinks;
        }

        public List<string> GetInvalidLinks()
        {
            return _invalidLinks;
        }
    }
}
