using System.ComponentModel.DataAnnotations;

namespace AppTesting.Models
{
    public class Users
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string CitizenId { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string HouseNo { get; set; }

        public string? VillageNo { get; set; }
        public string? Village { get; set; }
        public string? Lane { get; set; }
        public string? Road { get; set; }

        [Required]
        public string SubDistrict { get; set; }

        [Required]
        public string District { get; set; }

        [Required]
        public string Province { get; set; }

        [Required]
        public string PostCode { get; set; }
    }
}
