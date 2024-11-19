import Header from './components/Header'
import TerraformPlanViewer from './components/TerraformPlanViewer'

function App() {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 pb-8">
                <TerraformPlanViewer />
            </main>
            <footer className="mt-auto py-4 text-center text-gray-500 text-sm">
                <p>Use this tool to visualize your Terraform infrastructure changes</p>
            </footer>
        </>
    )
}

export default App
