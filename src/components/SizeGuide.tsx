import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuide = ({ isOpen, onClose }: SizeGuideProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Size Guide</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3 text-lg">T-Shirt Measurements (inches)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left">Size</th>
                    <th className="border border-border p-3 text-left">Chest (in)</th>
                    <th className="border border-border p-3 text-left">Length (in)</th>
                    <th className="border border-border p-3 text-left">Shoulder (in)</th>
                    <th className="border border-border p-3 text-left">Sleeve (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-medium">S</td>
                    <td className="border border-border p-3">36-38</td>
                    <td className="border border-border p-3">27</td>
                    <td className="border border-border p-3">17</td>
                    <td className="border border-border p-3">8</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-3 font-medium">M</td>
                    <td className="border border-border p-3">38-40</td>
                    <td className="border border-border p-3">28</td>
                    <td className="border border-border p-3">18</td>
                    <td className="border border-border p-3">8.5</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium">L</td>
                    <td className="border border-border p-3">40-43</td>
                    <td className="border border-border p-3">29</td>
                    <td className="border border-border p-3">19</td>
                    <td className="border border-border p-3">9</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-3 font-medium">XL</td>
                    <td className="border border-border p-3">43-46</td>
                    <td className="border border-border p-3">30</td>
                    <td className="border border-border p-3">20</td>
                    <td className="border border-border p-3">9.5</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium">2XL</td>
                    <td className="border border-border p-3">46-49</td>
                    <td className="border border-border p-3">31</td>
                    <td className="border border-border p-3">21</td>
                    <td className="border border-border p-3">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3 text-lg">How to Measure</h3>
            <div className="space-y-3 text-sm text-foreground/90">
              <div>
                <strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.
              </div>
              <div>
                <strong>Length:</strong> Measure from the highest point of the shoulder to the bottom hem.
              </div>
              <div>
                <strong>Shoulder:</strong> Measure from shoulder point to shoulder point across the back.
              </div>
              <div>
                <strong>Sleeve:</strong> Measure from the shoulder seam to the end of the sleeve.
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3 text-lg">Fit Guide</h3>
            <ul className="space-y-2 text-sm text-foreground/90">
              <li><strong>Regular Fit:</strong> Our standard fit with comfortable room through the chest and waist.</li>
              <li><strong>Between Sizes?</strong> We recommend sizing up for a more relaxed fit.</li>
              <li><strong>Shrinkage:</strong> Our garments are pre-shrunk, but expect minimal shrinkage (2-3%) after the first wash.</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Still unsure?</strong> Contact our customer service team for personalized sizing advice at support@onyxia.com
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
