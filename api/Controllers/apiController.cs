using api.Models;
using infrastructure.DataModels;
using infrastructure.QueryModels;
using Microsoft.AspNetCore.Mvc;
using service;

namespace api.Controllers;

[ApiController]
public class ApiController : ControllerBase
{
    private readonly Service _service;
    
    public ApiController(Service service)
    {
        _service = service;
    }
    

    [HttpGet]
    [Route("/api/feed")]
    public IEnumerable<NewsFeedItem> GetFeed()
    {
        return _service.GetArticlesForFeed();
    }

    [HttpGet]
    [Route("/api/articles")]
    public IEnumerable<SearchArticleItem> Get([FromQuery] ArticleSearchRequestDto dto)
    {
        return _service.SearchForArticles(dto.SearchTerm, dto.PageSize);
    }
    
    [HttpGet]
    [Route("api/articles/{articleId}")]
    public Article Get([FromRoute] int articleId)
    {
        return _service.GetArticle(articleId);
    }

    [HttpPost]
    [Route("/api/articles/")]
    public Article Post([FromBody] CreateArticleRequestDto dto)
    {
        HttpContext.Response.StatusCode = StatusCodes.Status201Created;
        return _service.CreateArticle(dto.Headline, dto.Body, dto.ArticleImgUrl, dto.Author);
    }

    [HttpPut]
    [Route("/api/articles/{articleId}")]
    public Article Put([FromRoute] int articleId, [FromBody] UpdateArticleRequestDto dto)
    {
        return _service.UpdateArticle(dto.Headline, articleId, dto.ArticleImgUrl, dto.Author, dto.Body);
    }

    [HttpDelete]
    [Route("/api/articles/{articleId}")]
    public object Delete([FromRoute] int articleId)
    {
        _service.DeleteArticle(articleId);
        return "Article Deleted";
    }
    
}
