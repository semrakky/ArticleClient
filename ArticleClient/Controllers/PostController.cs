using ArticleClient.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ArticleClient.Controllers
{
    public class PostController : Controller
    {
        // GET: Post
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult addNew()
        {
            return View();
        }

        public ActionResult uploadPartial()
        {
            var appData = Server.MapPath("~/Images/uploads");
            var images = System.IO.Directory.GetFiles(appData).Select(x => new ImagesUrl
            {
                imgUrl = Url.Content("/images/uploads/" + CKSource.FileSystem.Path.GetFileName(x))
            });
            return View(images);
        }

        public void uploadnow(HttpPostedFileWrapper upload)
        {
            if (upload != null)
            {
                string ImageName = upload.FileName;
                string path = System.IO.Path.Combine(Server.MapPath("~/Images/uploads"), ImageName);
                upload.SaveAs(path);
                Console.Write(path);
            }
        }

        public ActionResult editPost() {
            return View();
        }

  

       
    }
}