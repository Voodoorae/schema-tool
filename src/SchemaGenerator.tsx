import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface FormData {
  businessName: string;
  businessType: string;
  description: string;
  phone: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  country: string;
  website: string;
}

interface SchemaOutput {
  schema: object;
  copied: boolean;
}

function SchemaGenerator() {
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    businessType: 'LocalBusiness',
    description: '',
    phone: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    country: 'United States',
    website: '',
  });

  const [schemaOutput, setSchemaOutput] = useState<SchemaOutput | null>(null);

  const businessTypes = [
    { value: 'LocalBusiness', label: 'Local Business' },
    { value: 'Dentist', label: 'Dentist' },
    { value: 'Plumber', label: 'Plumber' },
    { value: 'Electrician', label: 'Electrician' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'LegalService', label: 'Legal Service' },
    { value: 'MedicalBusiness', label: 'Medical Business' },
    { value: 'Salon', label: 'Salon' },
    { value: 'AutoRepair', label: 'Auto Repair' },
    { value: 'ProfessionalService', label: 'Professional Service' },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateSchema = () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': formData.businessType,
      name: formData.businessName,
      description: formData.description,
      url: formData.website,
      telephone: formData.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: formData.streetAddress,
        addressLocality: formData.city,
        postalCode: formData.zipCode,
        addressCountry: formData.country,
      },
    };

    setSchemaOutput({
      schema,
      copied: false,
    });
  };

  const copyToClipboard = () => {
    if (schemaOutput) {
      const jsonString = JSON.stringify(schemaOutput.schema, null, 2);
      navigator.clipboard.writeText(jsonString).then(() => {
        setSchemaOutput({
          ...schemaOutput,
          copied: true,
        });
        setTimeout(() => {
          setSchemaOutput({
            ...schemaOutput,
            copied: false,
          });
        }, 2000);
      });
    }
  };

  return (
    <section className="mb-12">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Try Our Local Schema Generator Tool
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Fill in your business information and our local schema generator will create perfect JSON-LD code for you. Just copy it into your website's HTML.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              placeholder="Enter your business name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Business Type
            </label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            >
              {businessTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell customers about your business"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Website URL
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Street Address
            </label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              placeholder="123 Main Street"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Your city"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Zip Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="12345"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="United States"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        <button
          onClick={generateSchema}
          className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl mb-8"
        >
          Generate Schema Markup with Local Schema Generator
        </button>

        {schemaOutput && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                Your JSON-LD Local Schema Generator Code:
              </h3>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-all"
              >
                {schemaOutput.copied ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} className="mr-2" />
                    Copy to Clipboard
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-800 text-gray-100 p-6 rounded-lg overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed">
                {JSON.stringify(schemaOutput.schema, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default SchemaGenerator;
