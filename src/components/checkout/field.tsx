import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: ReactNode;
  mono?: boolean;
};

/** Campo de formulário com rótulo mono, linha inferior e erro gentil. */
export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, error, hint, mono, className = "", id, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="label text-indigo/70">
        {label}
      </label>
      <input
        ref={ref}
        id={fieldId}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${fieldId}-erro` : undefined}
        className={`mt-1.5 block w-full border-b bg-transparent py-2.5 text-body focus:outline-none ${
          error ? "border-pinhao" : "border-indigo/30 focus:border-indigo"
        } ${mono ? "font-mono text-[15px] tracking-[0.04em]" : ""}`}
        {...rest}
      />
      {error ? (
        <p id={`${fieldId}-erro`} className="label mt-1.5 text-pinhao">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-small text-indigo/55">{hint}</p>
      )}
    </div>
  );
});
