using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using HospitalProyecto.Models;

namespace HospitalProyecto.DAL
{
    public class Contexto : DbContext
    {
        public Contexto()
            : base("ConexionHospitalLife")
        {

        }
        //Definicion de tablas apartir de las entidades//
        public DbSet<Paciente> pacientes { get; set; }
        public DbSet<Medico> medicos { get; set; }
        public DbSet<Cita> citas { get; set; }



    }
}