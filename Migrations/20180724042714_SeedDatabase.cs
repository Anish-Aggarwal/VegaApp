using Microsoft.EntityFrameworkCore.Migrations;

namespace VegaApp.Migrations
{
    public partial class SeedDatabase : Migration
    {
        private string[] modelNames = { "Make1", "Make2", "Make3" };
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("Makes", "Name",modelNames);
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make1-ModelA',(SELECT ID from Makes where Name='Make1'))");
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make1-ModelB',(SELECT ID from Makes where Name='Make1'))");
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make1-ModelC',(SELECT ID from Makes where Name='Make1'))");
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make2-ModelA',(SELECT ID from Makes where Name='Make2'))");
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make2-ModelB',(SELECT ID from Makes where Name='Make2'))");
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make2-ModelC',(SELECT ID from Makes where Name='Make2'))");
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make3-ModelA',(SELECT ID from Makes where Name='Make3'))");
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make3-ModelB',(SELECT ID from Makes where Name='Make3'))");
            migrationBuilder.Sql("INSERT INTO Models(Name,MakeId) VALUES ('Make3-ModelC',(SELECT ID from Makes where Name='Make3'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Makes where Name in ('Make1','Make2','Make3')");
        }
    }
}
