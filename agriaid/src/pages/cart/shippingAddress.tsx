import { SfSelect, SfInput, SfCheckbox, SfButton } from '@storefront-ui/react';
import { useRouter } from 'next/navigation';
import { FormEventHandler, ChangeEvent, FocusEvent, useState } from 'react';



const countries = [
    { name: 'India', code: 'IN' },
    { name: 'Great Britain', code: 'GB' },
    { name: 'Poland', code: 'PL' },
    { name: 'United States of America', code: 'US' },
] as const;
const states = ['Karnataka', 'California', 'Florida', 'New York', 'Texas'] as const;

export default function AddressForm() {
    const [streetIsValid, setStreetIsValid] = useState(true);

    const validateStreet = (e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
        setStreetIsValid(!!e.target.value);
    };

    const router = useRouter()

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        /* your submit handler e.g.: */
        const form = e.target as HTMLFormElement;

        // data can be accessed in form of FormData
        const formData = new FormData(form);
        // or JSON object
        const formJSON = Object.fromEntries(formData.entries());
        // console.log(formJSON);
        // make api call here and send formJSON

        const countryCode = countries.find(country => country.name === formJSON.country)?.code;
        if (countryCode) {
            formJSON.country = countryCode;
        }


        try {
            const customerId = localStorage.getItem("customerId");
            const response = await fetch(`/api/checkout/setAddress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formJSON, customerId })
            });

            if (!response.ok) {
                throw new Error('Failed to save address! Please try Again later');
            }
            const result = await response.json();
            console.log(result)
            router.push('/api/checkout')

        } catch (error) {
            console.log('Something went wrong:', error);

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="p-4 flex gap-4 flex-wrap text-neutral-900 border border-gray-300 rounded-lg shadow-lg" style={{ maxWidth: 800, padding: 30 }} onSubmit={onSubmit}>
                <h2 className="w-full text-3xl typography-headline-4 md:typography-headline-3 font-bold">Set Up Billing address</h2>
                <label className="w-full md:w-auto flex-grow flex flex-col gap-0.5 mt-4 md:mt-0">
                    <span className="typography-text-sm font-medium">First Name</span>
                    <SfInput name="firstName" autoComplete="given-name" required />
                </label>
                <label className="w-full md:w-auto flex-grow flex flex-col gap-0.5">
                    <span className="typography-text-sm font-medium">Last Name</span>
                    <SfInput name="lastName" autoComplete="family-name" required />
                </label>
                <label className="w-full flex flex-col gap-0.5">
                    <span className="typography-text-sm font-medium">Phone</span>
                    <SfInput name="phone" type="tel" autoComplete="tel" required />
                </label>
                <label className="w-full flex flex-col gap-0.5 flex flex-col gap-0.5">
                    <span className="typography-text-sm font-medium">Country</span>
                    <SfSelect name="country" placeholder="-- Select --" autoComplete="country-name" required>
                        {countries.map((country) => (
                            <option key={country.code}>{country.name}</option>
                        ))}
                    </SfSelect>
                </label>
                <div className="w-full md:w-auto flex-grow flex flex-col gap-0.5">
                    <label>
                        <span className="typography-text-sm font-medium">Street</span>
                        <SfInput
                            name="street"
                            autoComplete="address-line1"
                            className="mt-0.5"
                            onBlur={validateStreet}
                            onChange={validateStreet}
                            required
                            invalid={!streetIsValid}
                        />
                    </label>
                    <div className="flex flex-colr mt-0.5">
                        {!streetIsValid && (
                            <strong className="typography-error-sm text-negative-700 font-medium">Please provide a street name</strong>
                        )}
                        <small className="typography-hint-xs text-neutral-500 mt-0.5">Street address or P.O. Box</small>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-0.5 md:w-[120px]">
                    <label>
                        <span className="typography-text-sm font-medium">Apt#, Suite, etc</span>
                        <SfInput name="aptNo" className="mt-0.5" />
                    </label>
                    <small className="typography-hint-xs text-neutral-500 mt-0.5">Optional</small>
                </div>
                <label className="w-full flex flex-col gap-0.5">
                    <span className="typography-text-sm font-medium">City</span>
                    <SfInput name="city" autoComplete="address-level2" required />
                </label>
                <label className="w-full md:w-auto flex flex-col gap-0.5 flex-grow">
                    <span className="typography-text-sm font-medium">State</span>
                    <SfSelect name="state" placeholder="-- Select --" autoComplete="address-level1" required>
                        {states.map((stateName) => (
                            <option key={stateName}>{stateName}</option>
                        ))}
                    </SfSelect>
                </label>
                <label className="w-full flex flex-col gap-0.5 md:w-[120px]">
                    <span className="typography-text-sm font-medium">ZIP Code</span>
                    <SfInput name="zipCode" placeholder="eg. 12345" autoComplete="postal-code" required />
                </label>

                <label className="w-full flex items-center gap-2">
                    <SfCheckbox name="useAsShippingAddress" />
                    Use as shipping address
                </label>

                <div className="w-full flex gap-4 mt-4 md:mt-0 md:justify-end">
                    <SfButton type="reset" variant="secondary" className="w-full md:w-auto">
                        Clear all
                    </SfButton>
                    <SfButton type="submit" className="w-full md:w-auto">
                        Save and Pay
                    </SfButton>
                </div>
            </form>
        </div>
    );
}
