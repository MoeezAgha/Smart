using Microsoft.AspNetCore.Mvc;

namespace Smart.Controllers
{


    public class SearchAddressController : Controller
    {
        private readonly SearchService _searchService = new SearchService();

        public SearchAddressController()
        {

        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SearchAddress(string address)
        {


            // Replace this with your actual address search logic
            List<Address> searchResults = await _searchService.SearchAsync(address);

            return Json(searchResults);
        }
    }

}