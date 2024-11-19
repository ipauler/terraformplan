import React, { useState } from 'react';
import { Plus, Minus, RefreshCw } from 'lucide-react';

const TerraformPlanViewer = () => {
    const [planText, setPlanText] = useState('');

    const parsePlan = (text) => {
        const changes = [];
        const lines = text.split('\n');
        let currentResource = null;
        let isCollectingChanges = false;

        const cleanLine = (line) => line.replace(/\x1b\[[0-9;]*m/g, '');

        for (let i = 0; i < lines.length; i++) {
            const line = cleanLine(lines[i]);

            if (line.includes('Terraform will perform the following actions:')) {
                isCollectingChanges = true;
                continue;
            }

            if (!isCollectingChanges) continue;

            if (line.match(/^  # .*(?:will be|must be)/)) {
                if (currentResource) {
                    const lastLine = currentResource.changes[currentResource.changes.length - 1];
                    if (lastLine && !lastLine.text.trim().endsWith('}')) {
                        currentResource.changes.push({ text: '}', indent: 2 });
                    }
                }

                currentResource = {
                    action: line.includes('must be replaced') ? '-/+' : '', // Set replace action from description
                    description: line.trim().replace(/^# /, ''),
                    changes: []
                };
                changes.push(currentResource);
                continue;
            }

            if (line.match(/^  [+~-][-+~/]* resource/)) {
                if (currentResource) {
                    // Only set action if not already set by 'must be replaced'
                    if (!currentResource.action) {
                        currentResource.action = line.trim().charAt(0);
                    }
                    currentResource.changes.push({
                        text: line.trim(),
                        indent: 2
                    });
                    if (!line.includes('{')) {
                        currentResource.changes.push({
                            text: '{',
                            indent: 2
                        });
                    }
                }
                continue;
            }

            if (currentResource && line.trim() && !line.trim().startsWith('#')) {
                const indent = line.search(/\S/);
                currentResource.changes.push({
                    text: line.trim(),
                    indent: Math.max(0, indent)
                });
            }
        }

        if (currentResource) {
            const lastLine = currentResource.changes[currentResource.changes.length - 1];
            if (lastLine && !lastLine.text.trim().endsWith('}')) {
                currentResource.changes.push({ text: '}', indent: 2 });
            }
        }

        return changes;
    };

    const getActionIcon = (action) => {
        if (action === '-/+') return (
            <div className="flex gap-1">
                <Minus className="text-red-600" size={16} />
                <Plus className="text-green-600" size={16} />
            </div>
        );
        if (action === '+') return <Plus className="text-green-600" size={16} />;
        if (action === '-') return <Minus className="text-red-600" size={16} />;
        if (action === '~') return <RefreshCw className="text-yellow-600" size={16} />;
        return null;
    };

    const getActionColor = (action) => {
        if (action === '-/+') return 'bg-orange-50 border-orange-200';
        if (action === '+') return 'bg-green-50 border-green-200';
        if (action === '-') return 'bg-red-50 border-red-200';
        if (action === '~') return 'bg-yellow-50 border-yellow-200';
        return '';
    };

    const getLineColor = (text) => {
        if (text.startsWith('+')) return 'text-green-600';
        if (text.startsWith('-')) return 'text-red-600';
        if (text.startsWith('~')) return 'text-yellow-600';
        return '';
    };

    const renderIndentedLine = (text, baseIndent) => {
        const indentLevel = Math.max(0, baseIndent / 2);
        return (
            <div style={{ marginLeft: `${indentLevel}rem` }} className="whitespace-pre">
                {text}
            </div>
        );
    };

    const changes = parsePlan(planText);

    return (
        <div className="w-full max-w-4xl p-4">
            <div className="mb-4">
        <textarea
            className="w-full h-32 p-2 border rounded font-mono text-sm"
            placeholder="Paste your terraform plan output here..."
            value={planText}
            onChange={(e) => setPlanText(e.target.value)}
        />
            </div>

            <div className="space-y-3">
                {changes.map((resource, idx) => (
                    <div key={idx} className="space-y-2">
                        {/* Description now outside the colored block */}
                        <div className="text-gray-600 text-sm font-mono pl-6">
                            {resource.description}
                        </div>

                        {/* Colored block with code */}
                        <div className={`p-3 rounded-lg border ${getActionColor(resource.action)}`}>
                            <div className="flex items-start gap-2">
                                <div className="mt-1">
                                    {getActionIcon(resource.action)}
                                </div>
                                <div className="font-mono text-sm flex-1 overflow-x-auto">
                                    <div className="pl-4 border-l border-gray-200">
                                        {resource.changes.map((change, changeIdx) => (
                                            <div key={changeIdx} className={getLineColor(change.text)}>
                                                {renderIndentedLine(change.text, change.indent)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Plus size={16} className="text-green-600" /> Create
                    </div>
                    <div className="flex items-center gap-1">
                        <Minus size={16} className="text-red-600" /> Delete
                    </div>
                    <div className="flex items-center gap-1">
                        <RefreshCw size={16} className="text-yellow-600" /> Update
                    </div>
                    <div className="flex items-center gap-1">
                        <Minus size={16} className="text-red-600" />
                        <Plus size={16} className="text-green-600" />
                        Replace
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TerraformPlanViewer;
