namespace Smart.Controllers
{
    public class SearchService
    {
        public async Task<List<Address>> SearchAsync(string query)
        {
            // Perform your address search logic here and return a List<Address>
            List<Address> searchResults = new List<Address>
    {
        new Address
        {
            StreetAddress = "1-Address Main St",
            City = "Tallahassee",
            State = "FL",
            County = "Leon"
        },
         new Address
        {
            StreetAddress = "123 Main St",
            City = "Bethesda",
            State = "MD",
            County = "SomeCounty"
        },
          new Address
        {
            StreetAddress = "4042 Bald Cypress Way",
            City = "Tallahassee",
            State = "FL",
            County = "Leon-County"
        },

    };

            return searchResults;
        }
    }

}