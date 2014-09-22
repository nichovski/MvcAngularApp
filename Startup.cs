using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MvcAngularApp.Startup))]
namespace MvcAngularApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
