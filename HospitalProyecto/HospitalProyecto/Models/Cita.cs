using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HospitalProyecto.Models
{
    public class Cita
    {
        public int citaID { get; set; }

        public String descripcion { get; set; }

        public DateTime fecha { get; set; }
        //llave foranea de  cliente
        public int pacienteID { get; set; }
        public virtual Paciente paciente { get; set; }

        //llave foranea de  cliente
        public int medicoID { get; set; }
        public virtual Medico medico { get; set; }
    }
}