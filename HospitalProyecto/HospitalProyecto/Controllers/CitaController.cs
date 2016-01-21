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

namespace HospitalProyecto.Controllers
{
    public class CitaController : Controller
    {
        private Contexto db = new Contexto();

        // GET: /Cita/
        public ActionResult Index()
        {
            var citas = db.citas.Include(c => c.medico).Include(c => c.paciente);

            return View(citas.ToList());
        }

        // GET: /Cita/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Cita cita = db.citas.Find(id);
            if (cita == null)
            {
                return HttpNotFound();
            }
            return View(cita);
        }

        // GET: /Cita/Create
        public ActionResult Create()
        {
            ViewBag.medicoID = new SelectList(db.medicos, "medicoID", "nombre");
            ViewBag.pacienteID = new SelectList(db.pacientes, "pacienteID", "nombre");
            return View();
        }

        // POST: /Cita/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="citaID,descripcion,fecha,pacienteID,medicoID")] Cita cita)
        {
            if (ModelState.IsValid)
            {
                db.citas.Add(cita);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.medicoID = new SelectList(db.medicos, "medicoID", "nombre", cita.medicoID);
            ViewBag.pacienteID = new SelectList(db.pacientes, "pacienteID", "nombre", cita.pacienteID);
            return View(cita);
        }

        // GET: /Cita/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Cita cita = db.citas.Find(id);
            if (cita == null)
            {
                return HttpNotFound();
            }
            ViewBag.medicoID = new SelectList(db.medicos, "medicoID", "nombre", cita.medicoID);
            ViewBag.pacienteID = new SelectList(db.pacientes, "pacienteID", "nombre", cita.pacienteID);
            return View(cita);
        }

        // POST: /Cita/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="citaID,descripcion,fecha,pacienteID,medicoID")] Cita cita)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cita).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.medicoID = new SelectList(db.medicos, "medicoID", "nombre", cita.medicoID);
            ViewBag.pacienteID = new SelectList(db.pacientes, "pacienteID", "nombre", cita.pacienteID);
            return View(cita);
        }

        // GET: /Cita/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Cita cita = db.citas.Find(id);
            if (cita == null)
            {
                return HttpNotFound();
            }
            return View(cita);
        }

        // POST: /Cita/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Cita cita = db.citas.Find(id);
            db.citas.Remove(cita);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
