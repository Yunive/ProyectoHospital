using System;
using System.Collections.Generic;
using System.ComponentModel;
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
        /*Representa la definicion de un modelo para vista (ViewModel),
     * por lo que no contiene información de relaciones con otras entidades*/
    public class VMPaciente
    {
        public int pacienteID { get; set; }
       [DisplayName("Nombre")]
        public String nombre { get; set; }
        [DisplayName("Apellido Paterno")]
        public String apellidoP { get; set; }
        [DisplayName("Apellido Materno")]
        public String apellidoM { get; set; }
        [DisplayName("Telefono")]
        public String telefono { get; set; }
        [DisplayName("Direccion")]
        public String direccion { get; set; }


        public VMPaciente(Paciente paciente)
        {
            this.pacienteID = paciente.pacienteID;
            this.nombre = paciente.nombre;
            this.apellidoP = paciente.apellidoP;
            this.apellidoM = paciente.apellidoM;
            this.telefono = paciente.telefono;
            this.direccion = paciente.direccion;



        }
    }
}