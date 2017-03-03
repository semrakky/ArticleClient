using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ArticleClient.Models;
namespace ArticleClient.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /User/
        public ActionResult Index()
        {
            if (Session["user"] == null)
            {
                return Redirect("/Account");
            }
            usersession user = Session["user"] as usersession;
            if (user.RoleName != "admin")
            {
                return Redirect("/Account");
            }
            return View();
        }
        public ActionResult AddNew()
        {

            return View();
        }

        public ActionResult Profile()
        {
            if (Session["user"] == null)
            {
                return Redirect("/Account");
            }
            return View();
        }

       
	}
}