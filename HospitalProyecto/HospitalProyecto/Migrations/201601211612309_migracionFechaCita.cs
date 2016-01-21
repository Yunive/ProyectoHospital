namespace HospitalProyecto.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migracionFechaCita : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Citas", "fecha", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Citas", "fecha");
        }
    }
}
