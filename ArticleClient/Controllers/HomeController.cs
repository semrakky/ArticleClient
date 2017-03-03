﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ArticleClient.Models;

namespace ArticleClient.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (Session["user"] == null)
                return Redirect("../Account");
            return View();
        }

        public ActionResult About()
        {
            if (Session["user"] == null)
                return Redirect("../Account");
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            if (Session["user"] == null)
                return Redirect("../Account");
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}