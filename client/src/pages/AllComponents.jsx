import React from "react";
import { useSelector } from "react-redux";

function AllComponents() {
  const { allComponents } = useSelector((state) => state.user);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
          <h1 className="text-2xl font-semibold text-white">All Components</h1>
          <p className="mt-2 text-sm text-slate-400">
            Browse component details, ownership, creation time, and all declared props.
          </p>
        </div>

        {allComponents?.length > 0 ? (
          <div className="grid gap-6">
            {allComponents.map((component, index) => {
              const ownerName = component?.owner?.name || "Unknown Owner";
              const ownerEmail = component?.owner?.email || "No email";
              const createdAt = component?.createdAt
                ? new Date(component.createdAt).toLocaleString()
                : "Unknown time";
              const propsList = Array.isArray(component?.props)
                ? component.props
                : typeof component?.props === "string"
                ? component.props.split(",").map((prop) => prop.trim()).filter(Boolean)
                : [];

              return (
                <div
                  key={component?._id || index}
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-white">{component?.name || "Untitled Component"}</h2>
                      <p className="text-sm text-slate-400">{component?.visibility ? `${component.visibility} component` : "Component details"}</p>
                    </div>
                    <div className="text-right text-sm text-slate-400">
                      <p>Created: <span className="text-white">{createdAt}</span></p>
                      <p>Owner: <span className="text-white">{ownerName}</span></p>
                      <p>Email: <span className="text-white">{ownerEmail}</span></p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-950/80 p-4 border border-slate-700">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-slate-300">Props</p>
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                        {propsList.length} {propsList.length === 1 ? "prop" : "props"}
                      </span>
                    </div>
                    {propsList.length > 0 ? (
                      <ul className="mt-3 grid gap-2 text-sm text-slate-300">
                        {propsList.map((prop, idx) => (
                          <li key={`${prop}-${idx}`} className="rounded-2xl bg-slate-900 px-3 py-2 text-slate-200">
                            {prop}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm text-slate-500">No props declared for this component.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center text-slate-400">
            No components available yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default AllComponents;
