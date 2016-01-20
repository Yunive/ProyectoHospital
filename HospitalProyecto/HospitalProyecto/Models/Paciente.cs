using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HospitalProyecto.Models
{
    public class Paciente : Persona
    {
        public int pacienteID { get; set; }


        //Un paciente puede estar en muchas  citas//
        public virtual ICollection<Cita> citas { get; set; }

    }
}