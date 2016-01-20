using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HospitalProyecto.Models
{
    public class Medico : Persona
    {
        public int medicoID { get; set; }

        public String especialidad { get; set; }

        //Un medico puede estar en muchas citas//

        public virtual ICollection<Cita> citas { get; set; }
 


    }
}