using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ArticleClient.Startup))]
namespace ArticleClient
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
