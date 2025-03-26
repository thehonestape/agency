import React, { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Divider,
  Button,
  Flex,
  TextInput,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
  Grid,
  Col,
  Badge,
  List,
  ListItem,
  Callout,
  Metric,
  Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionList,
  Tab
} from '@tremor/react';
import { FiFileText, FiCpu, FiDollarSign, FiCalendar, FiUsers, FiCheck, FiRefreshCw, FiEdit, FiDownload } from 'react-icons/fi';
import { generateProposal, Proposal, ProposalOptions } from '../../services/collaborationService';
import { Project } from '../../types/project.types'; 

const templateTypes = [
  { value: 'standard', label: 'Standard Proposal' },
  { value: 'detailed', label: 'Detailed Proposal' },
  { value: 'executive', label: 'Executive Summary' }
];

interface ProposalGeneratorProps {
  projectId: string;
  project?: Project | null;
  onProposalGenerated?: (proposal: Proposal) => void;
}

export function ProposalGenerator({ projectId, project, onProposalGenerated }: ProposalGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  
  // Form state
  const [title, setTitle] = useState(project ? `${project.name} Proposal` : 'New Project Proposal');
  const [description, setDescription] = useState(project?.description || '');
  const [templateType, setTemplateType] = useState<string>('standard');
  const [budget, setBudget] = useState<number>(50000);
  const [deliverables, setDeliverables] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('');
  
  const handleGenerateProposal = async () => {
    if (!projectId) return;
    
    setIsGenerating(true);
    
    try {
      const options: ProposalOptions = {
        projectId,
        title,
        description,
        templateType: templateType as 'standard' | 'detailed' | 'executive',
        budget,
        deliverables: deliverables.split('\n').filter(item => item.trim().length > 0),
        timeline
      };
      
      const newProposal = await generateProposal(options);
      setProposal(newProposal);
      
      if (onProposalGenerated) {
        onProposalGenerated(newProposal);
      }
    } catch (error) {
      console.error('Error generating proposal:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  return (
    <div className="space-y-6">
      {!proposal ? (
        <Card>
          <Title className="mb-4">Proposal Generator</Title>
          <Text>Create an AI-generated proposal for your project based on the details below.</Text>
          
          <Divider className="my-4" />
          
          <Grid numItems={1} numItemsSm={2} className="gap-4 mt-4">
            <Col>
              <div className="space-y-4">
                <TextInput
                  placeholder="Proposal Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-2"
                />
                
                <Textarea
                  placeholder="Project Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mb-2"
                  rows={4}
                />
                
                <Select
                  value={templateType}
                  onValueChange={setTemplateType}
                  className="mb-2"
                >
                  {templateTypes.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </Col>
            
            <Col>
              <div className="space-y-4">
                <NumberInput
                  placeholder="Budget"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  enableStepper={false}
                  startContent={<FiDollarSign className="text-gray-500" />}
                  className="mb-2"
                />
                
                <Textarea
                  placeholder="Key Deliverables (one per line)"
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  className="mb-2"
                  rows={3}
                />
                
                <Textarea
                  placeholder="Timeline (optional)"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="mb-2"
                  rows={2}
                />
              </div>
            </Col>
          </Grid>
          
          <Flex justifyContent="end" className="mt-6">
            <Button
              onClick={handleGenerateProposal}
              loading={isGenerating}
              loadingText="Generating..."
              icon={isGenerating ? undefined : FiCpu}
              size="lg"
              color="blue"
            >
              Generate Proposal
            </Button>
          </Flex>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <Flex justifyContent="between" alignItems="center" className="mb-4">
              <div>
                <Badge color="blue" icon={FiFileText} size="md">AI-Generated Proposal</Badge>
                <Title className="mt-2">{proposal.title}</Title>
                <Text>{proposal.description}</Text>
              </div>
              <Flex className="space-x-2">
                <Button icon={FiEdit} variant="secondary" size="sm">Edit</Button>
                <Button icon={FiDownload} variant="secondary" size="sm">Export</Button>
                <Button icon={FiRefreshCw} variant="light" onClick={() => setProposal(null)}>
                  New Proposal
                </Button>
              </Flex>
            </Flex>
          </Card>
          
          <div className="grid grid-cols-3 gap-4">
            <Card decoration="top" decorationColor="blue">
              <Flex alignItems="center" justifyContent="start" className="space-x-2">
                <FiDollarSign className="text-blue-500" />
                <Text>Total Budget</Text>
              </Flex>
              <Metric className="mt-2">{formatCurrency(proposal.content.budget.total)}</Metric>
            </Card>
            
            <Card decoration="top" decorationColor="green">
              <Flex alignItems="center" justifyContent="start" className="space-x-2">
                <FiCalendar className="text-green-500" />
                <Text>Timeline</Text>
              </Flex>
              <Text className="mt-2">12 Weeks</Text>
            </Card>
            
            <Card decoration="top" decorationColor="purple">
              <Flex alignItems="center" justifyContent="start" className="space-x-2">
                <FiUsers className="text-purple-500" />
                <Text>Team Size</Text>
              </Flex>
              <Text className="mt-2">{proposal.content.team.length} Members</Text>
            </Card>
          </div>
          
          <Card>
            <Accordion defaultOpen>
              <AccordionHeader>Executive Summary</AccordionHeader>
              <AccordionBody>
                <Text className="whitespace-pre-line">{proposal.content.executiveSummary}</Text>
              </AccordionBody>
            </Accordion>
          </Card>
          
          <Card>
            <Accordion defaultOpen>
              <AccordionHeader>Project Scope</AccordionHeader>
              <AccordionBody>
                <Text className="whitespace-pre-line">{proposal.content.scope}</Text>
              </AccordionBody>
            </Accordion>
          </Card>
          
          <Card>
            <Accordion defaultOpen>
              <AccordionHeader>Approach & Methodology</AccordionHeader>
              <AccordionBody>
                <Text className="whitespace-pre-line">{proposal.content.approach}</Text>
              </AccordionBody>
            </Accordion>
          </Card>
          
          <Card>
            <Accordion defaultOpen>
              <AccordionHeader>Deliverables</AccordionHeader>
              <AccordionBody>
                <List>
                  {proposal.content.deliverables.map((deliverable, index) => (
                    <ListItem key={index}>
                      <Flex alignItems="center" className="space-x-2">
                        <FiCheck className="text-green-500" />
                        <Text>{deliverable}</Text>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              </AccordionBody>
            </Accordion>
          </Card>
          
          <Card>
            <Accordion defaultOpen>
              <AccordionHeader>Budget Breakdown</AccordionHeader>
              <AccordionBody>
                <List>
                  {proposal.content.budget.breakdown.map((item, index) => (
                    <ListItem key={index}>
                      <Flex justifyContent="between">
                        <Text>{item.category}</Text>
                        <Text>{formatCurrency(item.amount)}</Text>
                      </Flex>
                    </ListItem>
                  ))}
                  <ListItem>
                    <Flex justifyContent="between" className="font-bold">
                      <Text>Total</Text>
                      <Text>{formatCurrency(proposal.content.budget.total)}</Text>
                    </Flex>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          </Card>
          
          <Card>
            <Accordion defaultOpen>
              <AccordionHeader>Project Team</AccordionHeader>
              <AccordionBody>
                <Grid numItems={1} numItemsSm={2} numItemsLg={2} className="gap-4">
                  {proposal.content.team.map((member, index) => (
                    <Card key={index} className="p-4">
                      <Title>{member.role}</Title>
                      <List>
                        {member.responsibilities.map((responsibility, rIndex) => (
                          <ListItem key={rIndex}>{responsibility}</ListItem>
                        ))}
                      </List>
                    </Card>
                  ))}
                </Grid>
              </AccordionBody>
            </Accordion>
          </Card>
          
          <Callout title="Next Steps" color="blue" className="mt-6">
            This proposal has been saved in draft status. You can edit it, share it with your team, 
            or present it to your client. To finalize, click "Edit" to make any needed adjustments.
          </Callout>
        </div>
      )}
    </div>
  );
} 