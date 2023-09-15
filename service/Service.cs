using infrastructure.DataModels;
using infrastructure.QueryModels;
using infrastructure.Repositories;

namespace service;

public class Service
{
    private readonly ArticleRepository _articleRepository;

    public Service(ArticleRepository articleRepository)
    {
        _articleRepository = articleRepository;
    }

    public IEnumerable<NewsFeedItem> GetArticlesForFeed()
    {
        return _articleRepository.GetArticlesForFeed();
    }

    public Article CreateArticle(string headline, string body, string articleImgUrl, string author)
    {
        var article = _articleRepository.CreateArticle(headline, body, author, articleImgUrl);
        if (ReferenceEquals(article, null)) throw new ArgumentException("Could not create new article");
        return article;
    }

    public Article UpdateArticle(string headline, int articleId, string articleImgUrl, string author, string body)
    {
        var updatedArticle = _articleRepository.UpdateArticle(headline, articleId, articleImgUrl, author, body);
        if (ReferenceEquals(updatedArticle, null)) throw new ArgumentException("Could not update article");
        return updatedArticle;
    }

    public void DeleteArticle(int articleId)
    {
        var result = _articleRepository.DeleteArticle(articleId);
        if (!result)
        {
            throw new ArgumentException("Could not delete Article");
        }
    }

    public IEnumerable<SearchArticleItem> SearchForArticles(string searchTerm, int pageSize)
    {
        return _articleRepository.GetArticles(searchTerm, pageSize);
    }

    public Article GetArticle(int articleId)
    {
        return _articleRepository.getArticleById(articleId);
    }
}
