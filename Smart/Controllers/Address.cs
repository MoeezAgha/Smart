namespace Smart.Controllers
{
    public record Address
    {
        // Properties
        public string StreetAddress { get; init; }
        public string City { get; init; }
        public string State { get; init; }
        public string County { get; init; }

        // Calculated property for the complete address
        public string CompleteAddress => $"{StreetAddress}, {City}, {State}, {County}";

        // Constructor (if needed)

        // ToString method is generated automatically
    }

    }