export default function ProfessionalLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <>
            {modal}
            {children}
        </>
    );
}
