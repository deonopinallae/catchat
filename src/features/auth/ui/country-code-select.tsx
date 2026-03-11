import { useMemo, useState } from 'react'

interface CountryOption {
	code: string
	name: string
	flag: string
	dialCode: string
}

interface CountryCodeSelectProps {
	onSelectDialCode: (dialCode: string) => void
}

const countryOptions: CountryOption[] = [
	{ code: 'ID', name: 'Indonesia', flag: '🇮🇩', dialCode: '+62' },
	{ code: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '+82' },
	{ code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
	{ code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
	{ code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
	{ code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
	{ code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
	{ code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39' },
	{ code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34' },
	{ code: 'NL', name: 'Netherlands', flag: '🇳🇱', dialCode: '+31' },
	{ code: 'SE', name: 'Sweden', flag: '🇸🇪', dialCode: '+46' },
	{ code: 'NO', name: 'Norway', flag: '🇳🇴', dialCode: '+47' },
	{ code: 'FI', name: 'Finland', flag: '🇫🇮', dialCode: '+358' },
	{ code: 'PL', name: 'Poland', flag: '🇵🇱', dialCode: '+48' },
	{ code: 'TR', name: 'Turkey', flag: '🇹🇷', dialCode: '+90' },
	{ code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
	{ code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86' },
	{ code: 'TH', name: 'Thailand', flag: '🇹🇭', dialCode: '+66' },
	{ code: 'VN', name: 'Vietnam', flag: '🇻🇳', dialCode: '+84' },
	{ code: 'SG', name: 'Singapore', flag: '🇸🇬', dialCode: '+65' },
	{ code: 'MY', name: 'Malaysia', flag: '🇲🇾', dialCode: '+60' },
	{ code: 'PH', name: 'Philippines', flag: '🇵🇭', dialCode: '+63' },
	{ code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61' },
	{ code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
	{ code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55' },
	{ code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52' },
	{ code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '+54' },
	{ code: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '+27' },
	{ code: 'AE', name: 'UAE', flag: '🇦🇪', dialCode: '+971' },
]

export const CountryCodeSelect = ({ onSelectDialCode }: CountryCodeSelectProps) => {
	const [isListOpen, setIsListOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedCountry, setSelectedCountry] = useState(countryOptions[0])

	const filteredCountries = useMemo(() => {
		const normalizedQuery = searchQuery.trim().toLowerCase()
		if (!normalizedQuery) return countryOptions
		return countryOptions.filter((country) => {
			return (
				country.name.toLowerCase().includes(normalizedQuery) ||
				country.code.toLowerCase().includes(normalizedQuery) ||
				country.dialCode.toLowerCase().includes(normalizedQuery)
			)
		})
	}, [searchQuery])

	const handleSelectCountry = (country: CountryOption) => {
		setSelectedCountry(country)
		onSelectDialCode(country.dialCode)
		setIsListOpen(false)
		setSearchQuery('')
	}

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setIsListOpen((previousValue) => !previousValue)}
				className="flex h-9 items-center gap-2 rounded bg-[#f7f7fc] px-2 py-[0.375rem] text-[#adb5bd]"
			>
				<span className="text-base leading-6">{selectedCountry.flag}</span>
				<span className="leading-6 font-semibold">
					{selectedCountry.dialCode}
				</span>
			</button>

			{isListOpen && (
				<div className="absolute left-0 top-10 z-20 w-[16rem] overflow-hidden rounded bg-[#f7f7fc] shadow">
					<div className="p-2">
						<input
							type="text"
							value={searchQuery}
							onChange={(event) => setSearchQuery(event.target.value)}
							placeholder="Search country or code"
							className="h-8 w-full rounded bg-white px-2 text-sm text-[#0f1828] outline-none"
						/>
					</div>
					<div className="max-h-60 overflow-auto">
						{filteredCountries.map((country) => (
							<button
								key={country.code}
								type="button"
								onClick={() => handleSelectCountry(country)}
								className="flex w-full items-center gap-2 px-2 py-1 text-left text-[#0f1828] hover:bg-[#ededed]"
							>
								<span>{country.flag}</span>
								<span className="text-sm">{country.name}</span>
								<span className="leading-6 font-semibold">
									{country.dialCode}
								</span>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
