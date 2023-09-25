using AppTesting.Data;
using AppTesting.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppTesting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly ApplicationDBContext _dbContext;

        public UsersController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(Users user)
        {
            try
            {
                var isCitizenIdDuplicate = _dbContext.Users.Any(u => u.CitizenId == user.CitizenId);

                var isEmailDuplicate = _dbContext.Users.Any(u => u.Email == user.Email);

                if (isCitizenIdDuplicate)
                {
                    var responseError = new
                    {
                        code = 400,
                        status = "Bad Request",
                        error = "เลขประจำตัวประชาชนซ้ำ",
                        errorMessage = "เลขประจำตัวประชาชนนี้มีอยู่ในระบบแล้ว"
                    };

                    return BadRequest(responseError);

                }
                else if (isEmailDuplicate)
                {
                    var responseError = new
                    {
                        code = 400,
                        status = "Bad Request",
                        error = "อีเมลซ้ำ",
                        errorMessage = "อีเมลนี้มีอยู่ในระบบแล้ว"
                    };

                    return BadRequest(responseError);

                }
                else
                {
                    var payload = new Users
                    {
                        Title = user.Title,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        CitizenId = user.CitizenId,
                        HouseNo = user.HouseNo,
                        VillageNo = user.VillageNo,
                        Village = user.Village,
                        Lane = user.Lane,
                        Road = user.Road,
                        SubDistrict = user.SubDistrict,
                        District = user.District,
                        Province = user.Province,
                        PostCode = user.PostCode,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                    };

                    _dbContext.Users.Add(payload);
                    await _dbContext.SaveChangesAsync();

                    var responseData = new
                    {
                        code = 200,
                        status = "OK",
                        data = payload
                    };

                    return StatusCode(StatusCodes.Status200OK, responseData);
                }

            }
            catch (Exception ex)
            {
                // หากเกิดข้อผิดพลาดในการประมวลผล คุณสามารถส่งรหัส HTTP 500 และข้อมูลข้อผิดพลาดไปยังลูกค้าได้
                var responseError = new
                {
                    code = 500,
                    status = "Internal Server Error",
                    error = "An error occurred while processing your request",
                    errorMessage = ex.Message // ใช้ข้อความข้อผิดพลาดจริงจากการเกิดข้อผิดพลาด
                };

                return StatusCode(StatusCodes.Status500InternalServerError, responseError);
            }


        }

    }
}
