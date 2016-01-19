using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HospitalProyecto.Startup))]
namespace HospitalProyecto
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
