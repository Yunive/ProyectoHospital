namespace HospitalProyecto.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Citas",
                c => new
                    {
                        citaID = c.Int(nullable: false, identity: true),
                        descripcion = c.String(),
                        pacienteID = c.Int(nullable: false),
                        medicoID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.citaID)
                .ForeignKey("dbo.Medicos", t => t.medicoID, cascadeDelete: true)
                .ForeignKey("dbo.Pacientes", t => t.pacienteID, cascadeDelete: true)
                .Index(t => t.pacienteID)
                .Index(t => t.medicoID);
            
            CreateTable(
                "dbo.Medicos",
                c => new
                    {
                        medicoID = c.Int(nullable: false, identity: true),
                        especialidad = c.String(),
                        nombre = c.String(),
                        apellidoP = c.String(),
                        apellidoM = c.String(),
                        telefono = c.String(),
                        direccion = c.String(),
                    })
                .PrimaryKey(t => t.medicoID);
            
            CreateTable(
                "dbo.Pacientes",
                c => new
                    {
                        pacienteID = c.Int(nullable: false, identity: true),
                        nombre = c.String(),
                        apellidoP = c.String(),
                        apellidoM = c.String(),
                        telefono = c.String(),
                        direccion = c.String(),
                    })
                .PrimaryKey(t => t.pacienteID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Citas", "pacienteID", "dbo.Pacientes");
            DropForeignKey("dbo.Citas", "medicoID", "dbo.Medicos");
            DropIndex("dbo.Citas", new[] { "medicoID" });
            DropIndex("dbo.Citas", new[] { "pacienteID" });
            DropTable("dbo.Pacientes");
            DropTable("dbo.Medicos");
            DropTable("dbo.Citas");
        }
    }
}
