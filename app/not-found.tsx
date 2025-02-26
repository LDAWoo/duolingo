import BaseLayout from "@/components/base-layout";
import NotFoundPage from "@/components/not-found-page";

export default function GlobalNotFound() {
    return (
        <BaseLayout locale={"en"}>
            <NotFoundPage />
        </BaseLayout>
    );
}
