﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using ArticleClient.Models;
namespace ArticleClient.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Login/
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult login(string username, string password){

            HttpClient httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("http://localhost:55550/api/");

            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var responseTask = httpClient.GetAsync("User/GetSession?name="+username+"&password="+password);
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                System.Diagnostics.Debug.WriteLine("Something...username="+username);
                var readTask = result.Content.ReadAsAsync<usersession>();
                
                readTask.Wait();
                usersession user = readTask.Result;
                Session["user"] = user;
                if (user.RoleName == "admin" || user.RoleName=="editor")
                    return Redirect("/post");
                return Redirect("../Home/");
               
            }

            return Redirect("../Account");
        }

        public ActionResult logout()
        {
            Session.Clear();
            return Redirect("/Home/");
        }

    }
}