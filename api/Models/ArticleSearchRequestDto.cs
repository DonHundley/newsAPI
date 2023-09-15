using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class ArticleSearchRequestDto
{
    [MinLength(3)]
    public string? SearchTerm { get; set; }
    [Range(1, Int32.MaxValue)]
    public int PageSize { get; set; }
}