using System.Collections;

namespace Api.Base
{
    public class ApiResponse
    {
        public ApiResponse()
        {
            Success = true;
        }

        public ApiResponse(object results, int totalCount = 0) : base()
        {
            Results = results;
            TotalCount = totalCount;
        }

        public ApiResponse(string message)
        {
            Success = false;
            Message = message;
        }

        public ApiResponse(bool success = true, object results = null, IEnumerable errors = null, string message = null)
        {
            Success = success;
            Results = results;
            Errors = errors;
            Message = message;
        }

        public bool Success { get; set; } = true;
        public int Code { get; set; } = 200;
        public object Results { get; set; }
        public IEnumerable Errors { get; set; }
        public string Message { get; set; }
        public int TotalCount { get; set; }
    }
}
