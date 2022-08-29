using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class BasketEntity_Added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9dedb0d2-26a1-4756-a05e-6b0fd819e72e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f35a2236-3b24-4525-b849-6876b6dbbb54");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2a4d2c18-6942-4568-8292-32744bd187dc", "9ac9cdbe-9749-4b41-a803-51be8a0a5130", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e748b040-8960-4825-a076-15a8a4a66298", "2df801d3-cb03-439f-9a8e-2b59d33262b5", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2a4d2c18-6942-4568-8292-32744bd187dc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e748b040-8960-4825-a076-15a8a4a66298");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "9dedb0d2-26a1-4756-a05e-6b0fd819e72e", "afbb9e0c-62cc-4155-8680-264fe393ad13", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f35a2236-3b24-4525-b849-6876b6dbbb54", "a37fda5d-1610-49a9-aa44-d5b43001299b", "Member", "MEMBER" });
        }
    }
}
