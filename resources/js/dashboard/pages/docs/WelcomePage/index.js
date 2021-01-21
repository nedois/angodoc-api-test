import React, { lazy, Suspense } from "react";
import Page from "@dashboard/components/Page";

const Content = lazy(() => import("!babel-loader!mdx-loader!./Content.mdx"));

const WelcomeView = () => {
    return (
        <Page title="Bem-vindo">
            <Suspense fallback={null}>
                <Content />
            </Suspense>
        </Page>
    );
};

export default WelcomeView;
