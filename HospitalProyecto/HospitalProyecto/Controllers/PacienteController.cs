using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using HospitalProyecto.Models;
using HospitalProyecto.DAL;
using System.Web.Script.Serialization;

namespace HospitalProyecto.Controllers
{
    public class PacienteController : Controller
    {
        private Contexto db = new Contexto();


        public ActionResult PruebaAjax()
        {
            return View();
        }

        public JsonResult EntregarDatos()
        {
            //var listaJson = from alumno in 
            //return Json(db.carreras.ToList(),JsonRequestBehavior.AllowGet);
            JavaScriptSerializer jss = new JavaScriptSerializer();
            String dato = "Esto viene del server";
            return Json(jss.Serialize(dato), JsonRequestBehavior.AllowGet);
        }

        // GET: /Paciente/
        public ActionResult Index()
        {
            return View(db.pacientes.ToList());
        }

        // GET: /Paciente/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Paciente paciente = db.pacientes.Find(id);
            if (paciente == null)
            {
                return HttpNotFound();
            }
            return View(paciente);
        }
        // GET: Alumno/Details/5
        //[Authorize(Roles = "Administrador, Capturista")]
      [HttpPost]
        public JsonResult AjaxDetails(int? id)
        {
            Paciente paciente = db.pacientes.Find(id);
            VMPaciente vmPaciente = new VMPaciente(paciente);

            return Json(vmPaciente, JsonRequestBehavior.AllowGet);
        }

        // GET: /Paciente/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Paciente/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="pacienteID,nombre,apellidoP,apellidoM,telefono,direccion")] Paciente paciente)
        {
            if (ModelState.IsValid)
            {
                db.pacientes.Add(paciente);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(paciente);
        }

        // GET: /Paciente/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Paciente paciente = db.pacientes.Find(id);
            if (paciente == null)
            {
                return HttpNotFound();
            }
            return View(paciente);
        }

        // POST: /Paciente/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="pacienteID,nombre,apellidoP,apellidoM,telefono,direccion")] Paciente paciente)
        {
            if (ModelState.IsValid)
            {
                db.Entry(paciente).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(paciente);
        }

        // GET: /Paciente/Delete/5
        [HttpGet]
        public JsonResult DeleteConfirmed(int idpaciente = 0)
        {
            String mensaje = "";
            try
            {
                Paciente paciente = db.pacientes.Find(idpaciente);
                db.pacientes.Remove(paciente);
                db.SaveChanges();
                mensaje = " Todo salio Muy Bien";
            }
            catch {
                mensaje = "Hubo un error";
            }
            return Json(new { mensaje = mensaje }, JsonRequestBehavior.AllowGet);
        }

        // POST: /Paciente/Delete/5
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Delete(int idpaciente=0)
        {
            Paciente paciente = db.pacientes.Find(idpaciente);
            db.pacientes.Remove(paciente);
            db.SaveChanges();
            return Json(paciente, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        [HttpGet]
        public JsonResult AjaxEdit(int pacienteID = 0)
        {
            /*Un objeto instanciado del modelo de datos*/
            Paciente paciente = db.pacientes.Find(pacienteID);

            /*Necesito una instancia del modelo de vista*/
            VMPaciente vmPaciente = new VMPaciente(paciente);

            return Json(vmPaciente, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AjaxEdit(Paciente paciente)
        {
            String mensaje = String.Empty;

            try
            {
                db.Entry(paciente).State = EntityState.Modified;
                int c = db.SaveChanges();
                mensaje = "Se ha editado los datos del alumno satisfactoriamente";
            }
            catch (Exception exc)
            {
                mensaje = "Hubo un error en el servidor: " + exc.Message;
            }


            return Json(new { mensaje = mensaje }, JsonRequestBehavior.AllowGet);
        }

    }
}
